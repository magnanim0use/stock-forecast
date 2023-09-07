export function up(pgm) {
    pgm.createTable('customer', {
        id: 'id',
        name: 'text',
        slack_org: 'text',
        slack_channel: 'text'
    })
}

export function down(pgm) {
    return pgm.dropTable('customer')
}
