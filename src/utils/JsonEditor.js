const editJsonFile = require('edit-json-file')

class JsonEditorClass {

    set = function (key, value) {
        return editJsonFile(`${process.cwd()}/src/systems/giveaway/storage/data.json`, {
            autosave: true,
            stringify_width: 4
        }).set(`${key}`, value)
    }

    get = function (key) {
        return editJsonFile(`${process.cwd()}/src/systems/giveaway/storage/data.json`, {
            autosave: true,
            stringify_width: 4
        }).get(`${key}`)
    }
}
let JsonEditor;
module.exports = JsonEditor = new JsonEditorClass()