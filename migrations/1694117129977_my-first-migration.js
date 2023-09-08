exports.up = pgm => {
    pgm.createTable('weather', {
        id: 'id',
        date: 'timestamp',
        location: 'text',
        avg_temp: 'numeric'
    })

    pgm.createTable('customer', {
        id: 'id',
        name: 'text',
        slack_org: 'text',
        slack_channel: 'text'
    })
}

exports.down = pgm => {
    return pgm.dropTable('weather')
}
