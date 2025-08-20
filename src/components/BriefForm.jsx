import Input from '#@/components/form/Input.jsx';
import InputFile from '#@/components/form/InputFile.jsx';
import Textarea from '#@/components/form/Textarea.jsx';
import Checkbox from '#@/components/form/Checkbox.jsx';
import Button from '#@/components/form/Button.jsx';
import { env } from '#_/server/utils/env.js';

const BriefForm = ({ url, classes = '' }) => {
	return <form  id="briefForm" action={url || (env.API_URL + 'send_brief')} method="POST" class={'form ' + classes} data-elt="briefForm">
		<div class="form__box">
			<div class="form__row">
				<div class="form__col">
					<Input name="name" type="text" label="Имя*" />
				</div>
				<div class="form__col">
					<Input name="company" type="text" label="Компания*" />
				</div>
				<div class="form__col">
					<Input name="phone" elts="mask" type="text" label="Телефон*" />
				</div>
				<div class="form__col">
					<Input name="email" type="text" label="E-mail*" />
				</div>
			</div>

			<InputFile name="file" label="Прикрепить файл" />
			<Textarea name="comment" label="Описание задачи" rows="4" />
			<Checkbox name="agreement" checked />
			<Button label="Отправить" />
		</div>

		<div class="form-response" data-form-response></div>
	</form>
};

export default BriefForm;
