@eatonfyi/clarango
=================

CLI tools for ArangoDB


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@eatonfyi/clarango.svg)](https://npmjs.org/package/@eatonfyi/clarango)
[![Downloads/week](https://img.shields.io/npm/dw/@eatonfyi/clarango.svg)](https://npmjs.org/package/@eatonfyi/clarango)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @eatonfyi/clarango
$ clarango COMMAND
running command...
$ clarango (--version)
@eatonfyi/clarango/0.0.0 darwin-arm64 node-v22.5.1
$ clarango --help [COMMAND]
USAGE
  $ clarango COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`clarango backup`](#clarango-backup)
* [`clarango config`](#clarango-config)
* [`clarango config remove`](#clarango-config-remove)
* [`clarango config reset`](#clarango-config-reset)
* [`clarango config set`](#clarango-config-set)
* [`clarango help [COMMAND]`](#clarango-help-command)
* [`clarango info`](#clarango-info)
* [`clarango restore`](#clarango-restore)

## `clarango backup`

backup the contents of a database

```
USAGE
  $ clarango backup [--json] [-d <value>] [-h <value>] [-p <value>] [-s <value>] [-u <value>]

CONNECTION FLAGS
  -d, --databaseName=<value>  Database name
  -h, --host=<value>          Server URL (with port)
  -p, --password=<value>      Server password
  -s, --server=<value>        [default: default] Saved server preset
  -u, --username=<value>      Server username

GLOBAL FLAGS
  --json  Format output as json.
```

_See code: [src/commands/backup.ts](https://github.com/eaton/clarango/blob/v0.0.0/src/commands/backup.ts)_

## `clarango config`

display and manage CLI settings

```
USAGE
  $ clarango config [--json] [-d <value>] [-h <value>] [-p <value>] [-s <value>] [-u <value>]

CONNECTION FLAGS
  -d, --databaseName=<value>  Database name
  -h, --host=<value>          Server URL (with port)
  -p, --password=<value>      Server password
  -s, --server=<value>        [default: default] Saved server preset
  -u, --username=<value>      Server username

GLOBAL FLAGS
  --json  Format output as json.
```

_See code: [src/commands/config/index.ts](https://github.com/eaton/clarango/blob/v0.0.0/src/commands/config/index.ts)_

## `clarango config remove`

remove settings for a server

```
USAGE
  $ clarango config remove [--json] [-d <value>] [-h <value>] [-p <value>] [-s <value>] [-u <value>]

CONNECTION FLAGS
  -d, --databaseName=<value>  Database name
  -h, --host=<value>          Server URL (with port)
  -p, --password=<value>      Server password
  -s, --server=<value>        [default: default] Saved server preset
  -u, --username=<value>      Server username

GLOBAL FLAGS
  --json  Format output as json.
```

_See code: [src/commands/config/remove.ts](https://github.com/eaton/clarango/blob/v0.0.0/src/commands/config/remove.ts)_

## `clarango config reset`

discard all saved server settings

```
USAGE
  $ clarango config reset [--json] [-d <value>] [-h <value>] [-p <value>] [-s <value>] [-u <value>]

CONNECTION FLAGS
  -d, --databaseName=<value>  Database name
  -h, --host=<value>          Server URL (with port)
  -p, --password=<value>      Server password
  -s, --server=<value>        [default: default] Saved server preset
  -u, --username=<value>      Server username

GLOBAL FLAGS
  --json  Format output as json.
```

_See code: [src/commands/config/reset.ts](https://github.com/eaton/clarango/blob/v0.0.0/src/commands/config/reset.ts)_

## `clarango config set`

add settings for a server

```
USAGE
  $ clarango config set [--json] [-d <value>] [-h <value>] [-p <value>] [-s <value>] [-u <value>]

CONNECTION FLAGS
  -d, --databaseName=<value>  Database name
  -h, --host=<value>          Server URL (with port)
  -p, --password=<value>      Server password
  -s, --server=<value>        [default: default] Saved server preset
  -u, --username=<value>      Server username

GLOBAL FLAGS
  --json  Format output as json.
```

_See code: [src/commands/config/set.ts](https://github.com/eaton/clarango/blob/v0.0.0/src/commands/config/set.ts)_

## `clarango help [COMMAND]`

Display help for clarango.

```
USAGE
  $ clarango help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for clarango.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.8/src/commands/help.ts)_

## `clarango info`

display database collections and metadata

```
USAGE
  $ clarango info [--json] [-d <value>] [-h <value>] [-p <value>] [-s <value>] [-u <value>]

CONNECTION FLAGS
  -d, --databaseName=<value>  Database name
  -h, --host=<value>          Server URL (with port)
  -p, --password=<value>      Server password
  -s, --server=<value>        [default: default] Saved server preset
  -u, --username=<value>      Server username

GLOBAL FLAGS
  --json  Format output as json.
```

_See code: [src/commands/info.ts](https://github.com/eaton/clarango/blob/v0.0.0/src/commands/info.ts)_

## `clarango restore`

backup the contents of a database

```
USAGE
  $ clarango restore [--json] [-d <value>] [-h <value>] [-p <value>] [-s <value>] [-u <value>]

CONNECTION FLAGS
  -d, --databaseName=<value>  Database name
  -h, --host=<value>          Server URL (with port)
  -p, --password=<value>      Server password
  -s, --server=<value>        [default: default] Saved server preset
  -u, --username=<value>      Server username

GLOBAL FLAGS
  --json  Format output as json.
```

_See code: [src/commands/restore.ts](https://github.com/eaton/clarango/blob/v0.0.0/src/commands/restore.ts)_
<!-- commandsstop -->
