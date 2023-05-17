import { injectable } from 'inversify'
import { Iconv } from 'iconv'
import * as fs from 'fs'
import path from 'path'
import { IFileGenerator } from '../report-generator'

@injectable()
export class IconvService implements IFileGenerator {
  private parseData<T>(data: T[][]): string[] {
    return data.map((chunk) => chunk.join(';'))
  }

  async generate({ data, fileName }: { data: string[][]; fileName: string }): Promise<string> {
    const iconv = new Iconv('UTF-8', 'WINDOWS-1251')

    await fs.promises.writeFile(
      path.resolve(__dirname, 'public', `${fileName}.csv`),
      iconv.convert(this.parseData(data).join('\n'))
    )

    return new Promise((resolve) => {
      const buffer = fs.readFileSync(path.resolve(__dirname, 'public', `${fileName}.csv`))
      return resolve(buffer.toString())
    })
  }
}