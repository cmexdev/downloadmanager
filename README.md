# Download Manager

Sort your downloads within seconds.

## What does it sort by?

As of right now, it only sorts by file types. Eventually, you will be able to sort by certain strings.

Here is a list of the current sort filters.

- File types

## How do I sort my files?

Pretty simple: just click the 'Sort files' button on the main screen.

**Future update**: the button brings up a popup window that allows users to choose the type of sorting.

## Repository info

This repository is missing the `electron.exe` file in the Electron module. **If you are building from the source code**, you need to run `npm install electron` in the project directory.

## `settings.json` syntax.

- `downloadsFolder`: specifies what folder is your download folder
- `fileTypes`: contains the filetypes that you want to sort
- `dmElse`: the path that files that don't match any sort-able filetypes go (**NOT IN USE**)

## Sorting files by filetypes.

If you want to sort your `.msi`s into a specific folder, than add it into the `settings.json` file.

Example:

```json
{
  "fileTypes": [
    {
      "mkv": "C:\\mkv"
    }
  ]
}
```

## Geek knowledge

**Download Manager** is built on [Electron](https://electronjs.org "Electron") and uses Node.js's [filesystem module](https://nodejs.org/api/fs.html "NodeJS FS Module").

This program can be used on really any folders that you want to organize.
