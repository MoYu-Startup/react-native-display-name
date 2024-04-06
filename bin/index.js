const {ios, android, common} = require('@raydeck/react-native-utilities');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('\x1b[31m%s\x1b[0m', 'Please enter a display name');
    return;
}

async function setDisplayName(name) {
    common.setDisplayName(name);
    ios.setPlistValue('CFBundleDisplayName', name);
    await android.setString('app_name', name);
}

await setDisplayName(args[0]);
console.log('\x1b[32m%s\x1b[0m', "set display name success!");
