import i18n from 'i18n'
import path from 'path'

i18n.configure({
    locales: ['uz', 'en', 'ru'],
    directory: path.join(process.cwd(), 'locales'),
    defaultLocale: 'uz',
    objectNotation: true,
    autoReload: true,
    syncFiles: true
})

export default i18n