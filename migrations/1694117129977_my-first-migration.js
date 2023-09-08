exports.up = async function (pgm) {
    await pgm.createTable('weather', {
        id: 'id',
        date: 'timestamp',
        location: 'text',
        avg_temp: 'numeric'
    })

    await pgm.createTable('customer', {
        id: 'id',
        name: 'text',
        slack_org: 'text',
        slack_channel: 'text'
    })

    return pgm.addIndex('weather', 'customer')
}

exports.down = pgm => {
    return pgm.dropTable('weather')
}
