"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Heading from "@/components/heading";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Input,
  Textarea,
  Link,
} from "@nextui-org/react";
import Icon from "@/lib/IconSprite";


const Contact = () => {
  return (
    <>
      <NavBar />

      <section className="px-4 space-y-8">
        <Heading
          title="Контакты"
          descriptions="Обращайтесь для решения любого вопроса!"
        />

        <div className="max-w-4xl gap-2 grid grid-cols-12 grid-rows-2 mx-auto">
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 flex-col !items-start bg-gradient-to-b from-black to-transparent opacity-85">
              <h4 className="text-white font-medium text-large drop-shadow-lg">
                Добро пожаловать!
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              className="z-0 w-full h-full object-cover"
              src="/YbN8kme76TA.jpg"
              alt="image"
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 flex-col !items-start bg-gradient-to-b from-black to-transparent opacity-85">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Любовь
              </p>
              <h4 className="text-white font-medium text-large drop-shadow-lg">
                С любовью для вас
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              className="z-0 w-full h-full object-cover"
              src="/ADXZFlpdWps.jpg"
              alt="image"
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 flex-col !items-start bg-gradient-to-b from-black to-transparent opacity-85">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Супер-пупер
              </p>
              <h4 className="text-white font-medium text-large drop-shadow-lg">
                Самая свежая выпечка
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              className="z-0 w-full h-full object-cover"
              src="/b-_0Gn76XnU.jpg"
              alt="image"
            />
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h4 className="leading-8 text-default-600 text-xl font-medium ml-2">
                Карта
              </h4>
            </CardHeader>
            <CardBody>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A334bea28064b0ca96b038e6c4aac576a12a5f74518171bcbab08487da7add230&amp;source=constructor" width="600" height="400" frameBorder="0" className="w-full h-full"></iframe>
            </CardBody>
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="absolute z-10 flex-col items-start bg-gradient-to-b from-black to-transparent opacity-85">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Тепло
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                Самые свежие новости
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              className="z-0 w-full h-full object-cover"
              src="/J0nDTixblzQ.jpg"
              alt="image"
            />
            <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-4 items-center">
                <Button className="text-tiny" color="primary" isIconOnly>
                  <Link href="https://vk.com/lis0809">
                    <Icon name="vk" size={24} className="fill-white" />{" "}
                  </Link>
                </Button>

                <Button className="text-tiny" color="primary" isIconOnly>
                  <Link href="https://t.me/LISCAFE08">
                    <Icon name="tg" size={24} className="fill-white" />{" "}
                  </Link>
                </Button>
                <div className="flex flex-col">
                  <p className="text-tiny text-white/70">Следите за нами</p>
                  <p className="text-tiny text-white/70">В VK и Telegram</p>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card
            isFooterBlurred
            className=" flex w-full h-[360px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="flex flex-col">
              <h3 className="leading-8 text-white/90 text-xl font-medium ml-2 justify-center">
                Связаться с нами
              </h3>
            </CardHeader>
            <Image
              removeWrapper
              className="absolute z-0 w-full h-full object-cover"
              src="/J0nDTixblzQ.jpg"
              alt="image"
            />
            <CardBody className="flex">
              <div className="w-full max-w-sm flex flex-col gap-3 mx-auto">
                <Input
                  isRequired
                  type="Имя"
                  label="Имя"
                  labelPlacement="inside"
                  className="max-w-sm"
                />
                <Textarea
                  isRequired
                  label="Сообщение"
                  labelPlacement="inside"
                  placeholder="Ваше сообщение..."
                  className="max-w-sm"
                />
                <Button color="primary">Отправить</Button>
              </div>
            </CardBody>
          </Card>

          {/* <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">New</p>
              <h4 className="text-black font-medium text-2xl">Acme camera</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src="/-7ep_Xbd0w4.jpg"
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-white text-tiny">Следите</p>
                <p className="text-white text-tiny">за новостями</p>
              </div>
              <Link href="https://vk.com/lis0809">
              <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                <Icon name="vk" size={24} className="fill-white" />
                <span>Группа Вконтакте</span>
              </Button>
              </Link>
            </CardFooter>
          </Card> */}
        </div>
      </section>

      <Footer />
    </>
  );
};
export default Contact;
