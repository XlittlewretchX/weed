import PhotoPair from "./components/PhotoPair/PhotoPair";
import PlusText from "./components/PlusText/PlusText";
import MainText from "./components/MainText/MainText";
import Text from "./components/Text/Text";
import PhotoSingle from "./components/PhotoSingle/PhotoSingle";
import LocationCard from "./components/LocationCard/LocationCard";
import Schedule from "./components/Schedule/Schedule";
import TelegramButton from "./components/TelegramButton/TelegramButton";
import GuestForm from "./components/GuestForm/GuestForm";
import BackgroundHearts from "./components/BackgroundHearts/BackgroundHearts";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";
import PhotoCard from "./components/PhotoCard/PhotoCard";
import "./App.css";

const publicUrl = process.env.PUBLIC_URL || "";

const items = [
  {
    time: "16:30",
    title: "Welcome",
    description:
      "Время, чтобы спокойно приехать, познакомиться, обняться, расслабиться и настроиться на атмосферу праздника.",
  },
  {
    time: "17:00",
    title: "Церемония",
    description:
      "Самый трогательный момент — когда мы скажем друг другу «Да» и станем семьёй. Будем счастливы разделить эти эмоции вместе с вами.",
  },
  {
    time: "18:00",
    title: "Банкет",
    description:
      "Праздничный ужин, тёплые слова, смех, танцы и искренние тосты.",
  },
  {
    time: "23:00",
    title: "Завершение вечера",
    description:
      "Финальные объятия, красивые кадры, немного волшебства и воспоминания, которые останутся с нами навсегда.",
  },
];

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <BackgroundHearts count={250} />
        <ScrollReveal direction="top" duration={920} distance={88}>
          <PhotoPair
            leftPhoto={{
              src: `${publicUrl}/image/Lera.png`,
              alt: "Лера",
              title: "Лера",
              loading: "eager",
              decoding: "sync",
            }}
            rightPhoto={{
              src: `${publicUrl}/image/Misha.jpg`,
              alt: "Миша",
              title: "Миша",
              loading: "eager",
              decoding: "sync",
            }}
          />
        </ScrollReveal>
        <ScrollReveal direction="left" delay={70} duration={860} distance={96}>
          <PlusText
            line1="Лера + Миша"
            line2="="
            heartSrc={`${publicUrl}/image/heart.png`}
          />
        </ScrollReveal>
        <ScrollReveal cascade cascadeStep={120} delay={40} duration={780} distance={56}>
          <MainText text="Узнали?" />
          <Text text="Время пронеслось незаметно и у этих двух милых деток скоро свадьба!" />
          <Text text="Да - да, мы сами в шоке!" />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={80} duration={820} distance={104}>
          <PhotoCard
            photoSrc={`${publicUrl}/image/08F4FBAD-7F63-4884-AE9B-BBA1BCF6570D.jpeg`}
            photoAlt="Совместное фото"
            title={
              <>
                Когда-то мы мечтали о будущем.
                <br />
                Теперь мы строим его вместе.
              </>
            }
          />
        </ScrollReveal>
        <ScrollReveal direction="left" cascade cascadeStep={100} delay={20} distance={72}>
          <MainText text="Дорогие и любимые" />
          <Text text="Наша свадьба без вас не будет такой счастливой, уютной и веселой! Приглашаем отметить этот день вместе с нами!" />
        </ScrollReveal>
        <ScrollReveal direction="top" cascade cascadeStep={120} delay={30} duration={820} distance={68}>
          <MainText text="25 июля 2026 года" />
          <PhotoSingle
            photo={{
              src: `${publicUrl}/image/calendar.png`,
              alt: "Календарь",
            }}
            withFrame={false}
          />
        </ScrollReveal>
        <ScrollReveal direction="right" duration={840} distance={96}>
          <LocationCard
            imageSrc={`${publicUrl}/image/besedka.png`}
            imageAlt="Место проведения"
            address="деревня Мстихино, Центральная улица, 45В"
            addressLink="https://yandex.ru/maps/10693/kaluga-oblast/house/tsentralnaya_ulitsa_45v/Z08YdwZmT0APQFtufXl3eXlrbQ==/?ll=36.116658%2C54.568589&z=16.57"
          />
        </ScrollReveal>
        <Schedule title="Расписание дня" items={items} />

        <ScrollReveal direction="right" cascade cascadeStep={110} delay={10} distance={76}>
          <MainText text="Дресс-код" />
          <Text text="Будем рады, если вы поддержите нас и выберете наряды в пастельных оттенках — нежных, светлых и воздушных.
Мужчины — для вас есть послабление.  Классические тёмные костюмы приветствуются." />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={150} duration={780} distance={84}>
          <PhotoSingle
            photo={{
              src: `${publicUrl}/image/color.jpg`,
              alt: "Календарь",
            }}
            withFrame={false}
          />
        </ScrollReveal>
        <ScrollReveal direction="left" cascade cascadeStep={130} distance={72}>
          <MainText text="Чат гостей" />
          <Text
            text="Мы создали Telegram-чат,
            где будем собирать все фотографии и видео с праздника,
            а также формировать наш общий плейлист для танцев!
            Присоединяйтесь по ссылке:"
          />
          <TelegramButton href="https://t.me/your_chat">
            Вступить в чат
          </TelegramButton>
        </ScrollReveal>
        <ScrollReveal direction="right" cascade cascadeStep={140} distance={80}>
          <MainText text="Анкета гостя" />
          <Text text="Пожалуйста, заполните анкету — так нам будет проще организовать праздник." />
          <GuestForm
            action="https://formspree.io/f/mgolynyr"
            title="Анкета гостя"
            submitLabel="Отправить"
          />
        </ScrollReveal>
        <ScrollReveal direction="left" cascade cascadeStep={120} delay={30} duration={820} distance={88}>
          <MainText text="Будем вас ждать!" />
          <PhotoCard
            photoSrc={`${publicUrl}/image/08F4FBAD-7F63-4884-AE9B-BBA1BCF6570D.jpeg`}
            photoAlt="Совместное фото"
            title="С любовью!"
            description="Миша и Лера"
          />
        </ScrollReveal>
      </div>
    </div>
  );
}

export default App;
