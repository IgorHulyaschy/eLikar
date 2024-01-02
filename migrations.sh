#!/bin/bash

yarn workspace tg-bot typeorm migration:run
yarn workspace hospital typeorm migration:run
yarn workspace medicine typeorm migration:run
yarn workspace medicine-report typeorm migration:run
yarn workspace nurse typeorm migration:run
yarn workspace patient typeorm migration:run
