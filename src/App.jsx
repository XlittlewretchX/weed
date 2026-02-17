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

const publicUrl = process.env.PUBLIC_URL || '';

function App() {
  return (
    <div className="app">
      <div className="app__content">
      <BackgroundHearts count={250} />
      <ScrollReveal>
      <PhotoPair
        leftPhoto={{
          src: `${publicUrl}/image/08F4FBAD-7F63-4884-AE9B-BBA1BCF6570D.jpeg`,
          alt: "Первая фотография",
          title: "Первая фотография",
        }}
        rightPhoto={{
          src: `${publicUrl}/image/08F4FBAD-7F63-4884-AE9B-BBA1BCF6570D.jpeg`,
          alt: "Вторая фотография",
          title: "Вторая фотография",
        }}
      />
      </ScrollReveal>
      <ScrollReveal delay={80} direction="left">
      <PlusText
        line1="Тигран + Григорян"
        line2="="
        heartSrc={`${publicUrl}/image/heart.png`}
      />
      </ScrollReveal>
      <ScrollReveal delay={60}>
      <MainText text="Согласны? Узнали?" />
      <Text text="Время пронеслось незаметно и у этих двух милых деток скоро свадьба!" />
      <Text text="Да - да, мы сами в шоке!" />
      </ScrollReveal>
      <ScrollReveal direction="right">
      <PhotoSingle
        photo={{
          src: `${publicUrl}/image/08F4FBAD-7F63-4884-AE9B-BBA1BCF6570D.jpeg`,
          alt: "Совместное фото",
          title: "Все начинается с любви",
        }}
      />
      </ScrollReveal>
      <ScrollReveal direction="left">
      <MainText text="Дорогие и любимые" />
      <Text text="Наша свадьба без вас не будет такой счастливой, уютной и веселой! Приглашаем отметить этот день вместе с нами!" />
      </ScrollReveal>
      <ScrollReveal delay={60}>
      <MainText text="25 июля 2026 года" />
      <PhotoSingle
        photo={{
          src: `${publicUrl}/image/calendar.png`,
          alt: "Календарь",
        }}
        withFrame={false}
      />
      </ScrollReveal>
      <ScrollReveal direction="right">
      <LocationCard
        imageSrc={`${publicUrl}/image/besedka.png`}
        imageAlt="Место проведения"
        address="Ереван, Гюбилькяна, д. 67"
        addressLink="https://maps.google.com/?q=ул.+Примерная,+д.+123"
      />

      <Schedule
        title="Расписание дня"
        items={[
          { time: "14:00", description: "Сбор гостей, фуршет" },
          { time: "15:30", description: "Церемония" },
          { time: "17:00", description: "Банкет" },
          { time: "21:00", description: "Торт и танцы" },
        ]}
      />
      </ScrollReveal>
      <ScrollReveal direction="right">
      <MainText text="Дресс-код" />
      <Text text="Мы очень старались сделать праздник красивым и будем рады, если вы поддержите цветовую гамму в пастельных тонах." />
      </ScrollReveal>
      <ScrollReveal direction="right" delay={200}>
      <PhotoSingle
        photo={{
          src: `${publicUrl}/image/color.png`,
          alt: "Календарь",
        }}
        withFrame={false}
      />
      </ScrollReveal>
      <ScrollReveal direction="left">
      <MainText text="Чат гостей" />
      <Text text="Для удобства создали чат" />
      <TelegramButton href="https://t.me/your_chat">
        Вступить в чат
      </TelegramButton>
      </ScrollReveal>
      <ScrollReveal direction="right">
      <MainText text="Анкета гостя" />
      <Text text="Пожалуйста, заполните анкету до указанной даты — так нам будет проще организовать праздник." />
      <GuestForm
        action="https://formspree.io/f/mgolynyr"
        title="Анкета гостя"
        submitLabel="Отправить"
      />
      </ScrollReveal>
      <ScrollReveal direction="left">
      <MainText text="Будем вас ждать!" />
      <PhotoSingle
        photo={{
          src: `${publicUrl}/image/08F4FBAD-7F63-4884-AE9B-BBA1BCF6570D.jpeg`,
          alt: "Совместное фото",
          title: "С любовью!",
          description: 'Миша и Лера'
        }}
      />
      </ScrollReveal>
      </div>
    </div>
  );
}

export default App;
