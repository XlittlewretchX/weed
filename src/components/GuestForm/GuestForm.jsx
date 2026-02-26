import { useState } from 'react';
import './GuestForm.css';

function GuestForm({
  action,
  title = 'Анкета гостя',
  submitLabel = 'Отправить',
  successMessage = 'Спасибо! Ваш ответ принят.',
  errorMessage = 'Не удалось отправить. Попробуйте ещё раз или напишите нам в Telegram.',
}) {
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorText, setErrorText] = useState('');
  const [errorType, setErrorType] = useState(null); // 'validation' | 'config' | 'network'
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    attending: false,
    alcohol: false,
  });

  const errorMissing = [
    fieldErrors.name ? 'Ваше имя' : null,
    fieldErrors.attending ? 'Придёте на праздник?' : null,
    fieldErrors.alcohol ? 'О предпочтениях алкоголя' : null,
  ].filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!action) {
      setStatus('error');
      setErrorText('Не указан адрес для отправки формы. Добавьте проп action (например, ссылку Formspree).');
      setErrorType('config');
      return;
    }

    const form = e.target;
    const name = form.name?.value?.trim();
    const attending = form.attending?.value;
    const alcoholChecked = form.querySelectorAll('input[name="alcohol"]:checked').length;

    const nextFieldErrors = {
      name: !name,
      attending: !attending,
      alcohol: alcoholChecked === 0,
    };

    if (Object.values(nextFieldErrors).some(Boolean)) {
      setStatus('error');
      setErrorType('validation');
      setFieldErrors(nextFieldErrors);
      return;
    }

    setStatus('sending');
    setErrorType(null);
    setFieldErrors({
      name: false,
      attending: false,
      alcohol: false,
    });
    const formData = new FormData(form);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setErrorType(null);
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorType('network');
        setErrorText(data.error || errorMessage);
      }
    } catch {
      setStatus('error');
      setErrorType('network');
      setErrorText(errorMessage);
    }
  };

  const clearErrorOnChange = (fieldName) => {
    if (status === 'error' && errorType === 'validation' && fieldErrors[fieldName]) {
      const nextFieldErrors = {
        ...fieldErrors,
        [fieldName]: false,
      };
      setFieldErrors(nextFieldErrors);

      if (!Object.values(nextFieldErrors).some(Boolean)) {
        setStatus(null);
        setErrorType(null);
      }
    }
  };

  return (
    <div className="guest-form-wrap">
      <form
        className="guest-form"
        onSubmit={handleSubmit}
        action={action}
        method="POST"
      >
        <h2 className="guest-form__title">{title}</h2>

        <label className="guest-form__label">
          <span className="guest-form__label-text">Ваше имя (и фамилия) *</span>
          <input
            id="guest-name"
            type="text"
            name="name"
            className="guest-form__input"
            placeholder="Иван Иванов"
            required
            disabled={status === 'sending'}
            aria-invalid={fieldErrors.name ? 'true' : 'false'}
            aria-describedby={fieldErrors.name ? 'guest-name-error' : undefined}
            onInput={() => clearErrorOnChange('name')}
          />
          {fieldErrors.name && (
            <p id="guest-name-error" className="guest-form__field-error">
              Укажите, пожалуйста, ваше имя.
            </p>
          )}
        </label>

        <label className="guest-form__label">
          <span className="guest-form__label-text">Придёте на праздник? *</span>
          <select
            id="guest-attending"
            name="attending"
            className="guest-form__input guest-form__select"
            required
            disabled={status === 'sending'}
            aria-invalid={fieldErrors.attending ? 'true' : 'false'}
            aria-describedby={fieldErrors.attending ? 'guest-attending-error' : undefined}
            onChange={() => clearErrorOnChange('attending')}
          >
            <option value="">Выберите</option>
            <option value="yes">Да, с удовольствием!</option>
            <option value="no">К сожалению, не смогу</option>
          </select>
          {fieldErrors.attending && (
            <p id="guest-attending-error" className="guest-form__field-error">
              Выберите, сможете ли вы прийти.
            </p>
          )}
        </label>

        <label className="guest-form__label">
          <span className="guest-form__label-text">Количество гостей (включая вас)</span>
          <input
            type="number"
            name="guests_count"
            className="guest-form__input"
            min="1"
            max="20"
            placeholder="1"
            disabled={status === 'sending'}
          />
        </label>

        <div className="guest-form__label">
          <span className="guest-form__label-text">О предпочтениях алкоголя *</span>
          <div
            className={`guest-form__checkbox-group ${fieldErrors.alcohol ? 'guest-form__checkbox-group--error' : ''}`}
            role="group"
            aria-label="Предпочтения по алкоголю (обязательно)"
            aria-describedby={fieldErrors.alcohol ? 'guest-alcohol-error' : undefined}
          >
            {[
              { value: 'Игристое', label: 'Игристое' },
              { value: 'Белое вино', label: 'Белое вино' },
              { value: 'Красное вино', label: 'Красное вино' },
              { value: 'Водка', label: 'Водка' },
              { value: 'Коньяк', label: 'Коньяк' },
              { value: 'Не пью алкоголь', label: 'Не пью алкоголь' },
            ].map(({ value, label }) => (
              <label key={value} className="guest-form__checkbox-wrap">
                <input
                  type="checkbox"
                  name="alcohol"
                  value={value}
                  className="guest-form__checkbox"
                  disabled={status === 'sending'}
                  onChange={() => clearErrorOnChange('alcohol')}
                />
                <span className="guest-form__checkbox-box" aria-hidden="true" />
                <span className="guest-form__checkbox-label">{label}</span>
              </label>
            ))}
          </div>
          {fieldErrors.alcohol && (
            <p id="guest-alcohol-error" className="guest-form__field-error">
              Выберите хотя бы один вариант.
            </p>
          )}
        </div>

        <label className="guest-form__label">
          <span className="guest-form__label-text">Комментарий или пожелания</span>
          <textarea
            name="message"
            className="guest-form__input guest-form__textarea"
            rows={3}
            placeholder="Напишите нам что-нибудь..."
            disabled={status === 'sending'}
          />
        </label>

        {status === 'success' && (
          <p className="guest-form__message guest-form__message--success" role="status" aria-live="polite">
            {successMessage}
          </p>
        )}

        {status === 'error' && (
          <div
            className="guest-form__message guest-form__message--error"
            role="alert"
            aria-live="assertive"
          >
            {errorType === 'validation' ? (
              <>
                <span className="guest-form__error-icon" aria-hidden>♥</span>
                <p className="guest-form__error-title">Проверьте анкету</p>
                <p className="guest-form__error-text">
                  Чтобы мы могли учесть ваши пожелания, заполните, пожалуйста, обязательные поля:
                </p>
                <ul className="guest-form__error-list">
                  {errorMissing.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <span className="guest-form__error-icon guest-form__error-icon--warn" aria-hidden>!</span>
                <p className="guest-form__error-title">Не удалось отправить</p>
                <p className="guest-form__error-text">{errorText}</p>
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          className="guest-form__submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Отправка...' : submitLabel}
        </button>
      </form>
    </div>
  );
}

export default GuestForm;
