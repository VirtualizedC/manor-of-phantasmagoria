import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { SlashCommand } from './types'
import { config } from 'dotenv'
import { readdirSync } from 'fs'
import { join } from 'path'

if (process.env.NODE_ENV === undefined) config()

const { Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates } = GatewayIntentBits
const client = new Client({ intents:[Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates] })

client.commands = new Collection<string, SlashCommand>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, './handlers')
readdirSync(handlersDir).forEach(handler => {
	if (!handler.endsWith('.js')) return
	require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.DISCORD_TOKEN)
