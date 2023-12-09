#!/bin/bash

# yarn
# yarn build:modules
yarn workspace api start:dev
yarn workspace tg-bot typeorm migration:run
yarn workspace tg-bot start:dev
# yarn workspace hospital start:dev
# yarn workspace mailer start:dev
# yarn workspace medicine start:dev
# yarn workspace medicine-report start:dev
# yarn workspace nurse start:dev
# yarn workspace patient start:dev
# yarn workspace report-generator start:dev
