const config = require('../../../config');

module.exports.getStatus = () => {
    fetch(config.application.pterodactyl.link + "/api/client/servers/7172342f", {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": config.application.pterodactyl.token,
            "cookie": "pterodactyl_session=eyJpdiI6Ijh2dm1hNU1RN3VyWUdsVHZuaHFhQ2c9PSIsInZhbHVlIjoibXJJcnNsNllQQVpEdWY0cXhZWXdsQUd4Y3lGRkpyNFlFM21hYzVZWmlIb0pmaVFkTmNXNVFFNlBZTGRoaHJHYytWeG9keWxyNlBBWjZOc2t5dTMrdkEzbkdCTmN5TzZDWXdpaHlQV1R3ZWUzSWxVY2lXZCtLZFBTczRPMmk3TmsiLCJtYWMiOiI3MmYxN2YwYWQ5N2QwZWI5MTE3ZTMzMTEzNDMwZTEwZjQ3NjRiNzEwYjU0NDE3ZWQwMmM1YWVhY2M1ZDJiMmQ1IiwidGFnIjoiIn0%3D"
        }
    })
        .then(response => console.log(response))
        .catch(err => console.error(err));
}