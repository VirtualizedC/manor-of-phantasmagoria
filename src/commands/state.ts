import { SlashCommandBuilder, PermissionFlagsBits, SlashCommandStringOption } from 'discord.js'
import { SlashCommand } from '../types'
import State from '../services/State'

const STATE = {
	RESET: 'RESET',
	START: 'START',
}

const command : SlashCommand = {
	// @ts-ignore
	command: new SlashCommandBuilder()
		.setName('state')
		.setDescription('Set the game to a specific state')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(new SlashCommandStringOption()
			.setName('state')
			.setDescription('State to set the game to')
			.addChoices({
				name: STATE.RESET,
				value: STATE.RESET,
			}, {
				name: STATE.START,
				value: STATE.START,
			})
			.setRequired(true)),
	execute: interaction => {
		const state = interaction.options.get('state')

		if (State === null) {
			interaction.reply({ ephemeral: true, content: 'Error: State not initialized' })
			console.error('Error: State not initialized')
			return
		}

		interaction.reply({
			ephemeral: true,
			content: 'Updating State...',
		})
		if (state?.value === STATE.RESET) {
			State.reset()
		}
		else if (state?.value === STATE.START) {
			State.invite()
		}
	},
}

export default command