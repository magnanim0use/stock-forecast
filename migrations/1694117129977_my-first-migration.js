export function up(pgm) {
    pgm.createTable('weather', {
        id: 'id',
        date: 'timestamp',
        location: 'text',
        avg_temp: 'numeric'
    })
}

export function down(pgm) {
    return pgm.dropTable('weather')
}
