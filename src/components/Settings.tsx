import React, { useState } from 'react';
import { Accordion, Icon, Select, Input } from 'semantic-ui-react'

const Settings = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [options, setOptions] = useState([
		{ key: 'af', value: 'af', text: 'Afghanistan' },
		{ key: 'ax', value: 'ax', text: 'Aland Islands' },
		{ key: 'al', value: 'al', text: 'Albania' },
		{ key: 'dz', value: 'dz', text: 'Algeria' },
		{ key: 'as', value: 'as', text: 'American Samoa' },
	])

	const handleClick = (e, titleProps) => {
		const { index } = titleProps
		const newIndex = activeIndex === index ? -1 : index
		setActiveIndex(newIndex)
	}

	return (
		<Accordion fluid styled style={{maxWidth: '500px', marginTop: '15px'}}>
			<Accordion.Title
				active={activeIndex === 2}
				index={2}
				onClick={handleClick}
			>
			<Icon name='dropdown' />
				Настройки
			</Accordion.Title>
			<Accordion.Content active={activeIndex === 2}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<Input icon='male' iconPosition='left' placeholder='Введите логин' />
					<Input icon='folder open outline' iconPosition='left' placeholder='Введите название репозитория' />
					<Select placeholder='Добавить в ЧС' options={options} multiple/>
				</div>
			</Accordion.Content>
      	</Accordion>
	)
}

export default Settings;