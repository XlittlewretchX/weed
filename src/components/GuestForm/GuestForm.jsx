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
  const [errorMissing, setErrorMissing] = useState([]);

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

    const missing = [];
    if (!name) missing.push('Ваше имя');
    if (!attending) missing.push('Придёте на праздник?');
    if (alcoholChecked === 0) missing.push('О предпочтениях алкоголя');

    if (missing.length > 0) {
      setStatus('error');
      setErrorType('validation');
      setErrorMissing(missing);
      return;
    }

    setStatus('sending');
    setErrorType(null);
    setErrorMissing([]);
    const formData = new FormData(form);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
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

  const clearErrorOnChange = () => {
    if (status === 'error') {
      setStatus(null);
      setErrorMissing([]);
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
            type="text"
            name="name"
            className="guest-form__input"
            placeholder="Иван Иванов"
            disabled={status === 'sending'}
            onInput={clearErrorOnChange}
          />
        </label>

        <label className="guest-form__label">
          <span className="guest-form__label-text">Придёте на праздник? *</span>
          <select
            name="attending"
            className="guest-form__input guest-form__select"
            disabled={status === 'sending'}
            onChange={clearErrorOnChange}
          >
            <option value="">Выберите</option>
            <option value="yes">Да, с удовольствием!</option>
            <option value="no">К сожалению, не смогу</option>
          </select>
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
          <div className="guest-form__checkbox-group" role="group" aria-label="Предпочтения по алкоголю (обязательно)">
            {[
              { value: 'wine', label: 'Игристое' },
              { value: 'champagne', label: 'Белое вино' },
              { value: 'beer', label: 'Красное вино' },
              { value: 'strong', label: 'Водка' },
              { value: 'cocktails', label: 'Коньяк' },
              { value: 'none', label: 'Не пью алкоголь' },
            ].map(({ value, label }) => (
              <label key={value} className="guest-form__checkbox-wrap">
                <input
                  type="checkbox"
                  name="alcohol"
                  value={value}
                  className="guest-form__checkbox"
                  disabled={status === 'sending'}
                  onChange={clearErrorOnChange}
                />
                <span className="guest-form__checkbox-box" aria-hidden="true" />
                <span className="guest-form__checkbox-label">{label}</span>
              </label>
            ))}
          </div>
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
          <p className="guest-form__message guest-form__message--success">
            {successMessage}
          </p>
        )}

        {status === 'error' && (
          <div
            className="guest-form__message guest-form__message--error"
            role="alert"
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
