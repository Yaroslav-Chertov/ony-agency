import { Telegraf, Format } from 'telegraf'
import { message } from 'telegraf/filters'
import { saveFile } from '../utils/fs.js'
import { readFile, writeFile } from 'node:fs/promises'

const BOT_KEY = process.env.BOT_KEY || '7652075441:AAFNMaNT-VBAJAUe6a8CBd7cZXkKLMhC9NY'
const OWNER_CHAT_ID = [{id: 216276405, status: 'active'}]
const fileName = 'bot-users.json'
const bot = new Telegraf(BOT_KEY)

// DB
const saveUsers = async (users) => {
    try {
        await writeFile(fileName, JSON.stringify(users))
        return true
    } catch (error) {
        sendAdminMessage(error.message)
        return false
    }
}

const loadUsers = async () => {
    let currentUsers = []
    try {
        currentUsers = JSON.parse(await readFile(fileName))
        return currentUsers || [];
    } catch (e) {
        const r = await writeFile(fileName, '[]')
    }

    return currentUsers
}

const appendUser = async (newUser) => {
    try {
        const users = await loadUsers()
        const userExists = users.find(u => u.id === newUser.id);

        if (userExists) {
            return 'Вы уже добавлены в список получателей. Статус: ' + userExists.status
        }

        users.push({
            id: newUser.id,
            status: 'pending'
        })

        await saveUsers(users)

        return true
    } catch (error) {
        sendAdminMessage(error.message)
        return false
    }
}

const approveUsers = async (ids) => {
    try {
        const approved = []
        const users = (await loadUsers()).map((u, i) => {
            if (ids.includes(u.id.toString())) {
                const updated = {
                    ...u,
                    status: 'active'
                }

                approved.push(updated);

                return updated
            }

            return u
        });

        await saveUsers(users)

        return approved
    } catch (error) {
        sendAdminMessage(error.message)
        return false
    }
}

const deleteUser = async (id) => {
    try {
        const users = (await loadUsers()).filter(u => u.id !== id)
        await saveUsers(users)
        return true
    } catch (error) {
        sendAdminMessage(error.message)
        return false
    }
}


// BOT INTERACTIONS

const sendAdminMessage = (message) => {
    if (process.env.NOTIFY_TELEGRAM !== 'true') return;
    if (!message) return;

    OWNER_CHAT_ID.map(c => {
        bot.telegram.sendMessage(c.id, message)
    })
}

const sendMessage = async (message, specialUsers) => {
    if (process.env.NOTIFY_TELEGRAM !== 'true') return;
    if (!message) return;

    let users = specialUsers || (await loadUsers())
    users.filter(u => u.status === 'active').map(c => {
        bot.telegram.sendMessage(c.id, message)
    })
}

// COMMANDS
bot.command('start', async (ctx) => {
    const status = await appendUser({
        id: ctx.chat.id,
        status: 'pending'
    })
    ctx.reply(status === true ? 'Запрос на получение уведомлений отправлен' : (status || 'Ошибка при обработке запроса start. Попробуйте позже'))
    sendAdminMessage(`Запрос на авторизацию от пользователя: @${ctx.message.from.username}`)
    sendAdminMessage(Format.code(`/allow ${ctx.message.from.id}`))
})

bot.command('stop', async (ctx) => {
    const status = await deleteUser(ctx.chat.id)
    ctx.reply(status === true ? 'Вы удалены из списка получателей уведомлений' : (status || 'Ошибка при обработке запроса stop. Попробуйте еще раз'))
    sendAdminMessage('Удаление пользователя: @' + ctx.message.from.username)
})

bot.command('allow', async (ctx) => {
    const userIDs = ctx.message.text.split(' ').slice(1);

    if (!userIDs.length) {
        ctx.reply('Отправьте список id пользователей через пробел');
        return
    }

    if (!OWNER_CHAT_ID.find(u => u.id === ctx.message.from.id)) {
        console.log('Попытка выполнения команды allow:', ctx.message.from.username);
        return;
    }

    const approved = await approveUsers(userIDs);
    sendMessage('Подтверждено', approved)
    ctx.reply(approved.length ? `Пользователи ${userIDs} активированы` : 'Ошибка активации');
})

bot.command('list', async (ctx) => {
    if (!OWNER_CHAT_ID.find(u => u.id === ctx.message.from.id)) {
        console.log('Попытка выполнения команды list:', ctx.message.from.username);
        return;
    }

    const users = (await loadUsers()).map(u => `${u.id}: ${u.status}`).join(',\n');
    ctx.reply(users || 'Список пользователей пуст')
})

const initNotifier = () => {
    if (process.env.NOTIFY_TELEGRAM !== 'true') return;
    bot.launch();
    // sendMessage('Сайт запущен после перезагрузки')
}

export {
    initNotifier,
    sendMessage,
    sendAdminMessage
}