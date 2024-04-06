#!/usr/bin/env node

const {cosmiconfigSync} = require('cosmiconfig');
const path = require('path');
const {ios, android, common} = require('@raydeck/react-native-utilities');

const args = process.argv.slice(2);

if (args.length === 0) {
    const explorerSync = cosmiconfigSync('displayName');
    const result = explorerSync.load(path.join(process.cwd(), 'app.json'));
    if (result) {
        await setDisplayName(result);
        console.log('\x1b[32m%s\x1b[0m', "Sync app.json displayName success!");
    } else {
        console.error('\x1b[31m%s\x1b[0m', 'Please enter a display name');
    }
}else {
    await setDisplayName(args[0]);
    console.log('\x1b[32m%s\x1b[0m', "Set display name success!");
}

async function setDisplayName(name) {
    common.setDisplayName(name);
    ios.setPlistValue('CFBundleDisplayName', name);
    await android.setString('app_name', name);
}
