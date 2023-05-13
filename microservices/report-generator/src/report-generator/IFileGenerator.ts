export interface IFileGenerator {
  generate: ({ data, fileName }: { data: string[][]; fileName: string }) => Promise<Buffer>
}
