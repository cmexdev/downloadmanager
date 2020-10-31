# Download Manager

Sort your downloads within seconds.

## How do I sort my files?

Pretty simple: just click the 'Sort files' button on the main screen.

## `settings.json` syntax.

- `downloadsFolder` (required): specifies what folder is your download folder
- `fileTypes` (required): contains the filetypes that you want to sort
- `dmElse`: the path that files that don't match any sort-able filetypes go (**NOT IN USE**)

## Sorting files by filetypes.

If you want to sort your `.msi`s into a specific folder, than add it into the `settings.json` file.

Example:

```json
{
  "fileTypes": [
    {
      "msi": "C:\\path\\where\\.msi\\files\\go\\"
    }
  ]
}
```

## Building from source code

After downloading/cloning the repository, in that directory, run:

```txt
npm install
```

This will install the packages required to run downloadmanager. (You may not need to do this step.)

After installing the packages, run:

```txt
npm start
```

This will start downloadmanager from source code!