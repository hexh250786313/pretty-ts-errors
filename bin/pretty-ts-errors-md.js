#!/usr/bin/env node

"use strict";

process.on("unhandledRejection", (r) => console.log(r));

require("../lib/cmd.js").run();
