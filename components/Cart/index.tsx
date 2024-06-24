import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import FormatPrice from "@/utils/FormatPrice";
import Icon from "@/lib/IconSprite";
import { CartItem } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart, setCart } = useContext(CartContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [shopList, setShopList] = useState("");
  const [comment, setComment] = useState("");
  var [totalAmount, setTotalAmount] = useState(0); // Состояние для общей суммы заказа

  useEffect(() => {
    updateMessage();
  }, [cart]);

  const updateMessage = () => {
    // Формируем текст сообщения на основе содержимого корзины
    const itemsText = cart
      .map((item) => `${item.product.title} (${item.quantity} шт.)`)
      .join("\n");
    var calculatedTotalAmount = cart.reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0
    );
    setTotalAmount(calculatedTotalAmount); // Обновляем состояние totalAmount
    setShopList(
      `\n${itemsText}\n\nОбщая сумма заказа: ${FormatPrice(
        calculatedTotalAmount
      )} ₽`
    );
    totalAmount = calculatedTotalAmount;
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/^(\d{1,2})(\d{3})(\d{3})(\d{2})(\d{2})$/, "+$1 ($2) $3-$4-$5");
    setPhoneNumber(formattedValue);
  };

  const sendContactForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = { email, phoneNumber, shopList, comment, totalAmount };

    try {
      const response = await fetch("/api/sendemail/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при отправке сообщения.");
    }
  };

  const clearCart = () => {
    setCart([]); // Очищаем корзину
    setTotalAmount(0); // Сбрасываем общую сумму заказа
    setShopList(""); // Очищаем сообщение
    onClose(); // Закрываем модальное окно
  };

  return (
    <>
      <Button onClick={onOpen} color="primary" variant="flat">
        <Icon name="cart" size={24} className="fill-primary" />
        <span>
          {FormatPrice(
            cart.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
          )}{" "}
          ₽
        </span>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        scrollBehavior="normal"
        placement="top"
        className="w-full max-h-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70"
      >
        <ModalContent className="sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full mx-auto">
          <ModalHeader className="text-xs sm:text-sm">
            Оформить заказ!
          </ModalHeader>
          <ModalBody className="max-h-[70vh] overflow-y-auto">
            <form
              onSubmit={sendContactForm}
              id="contact-form"
              method="post"
              role="form"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl flex flex-col gap-2 mx-auto"
            >
              <Input
                isRequired
                id="email"
                type="email"
                label="Ваш Email"
                labelPlacement="inside"
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                isRequired
                id="phoneNumber"
                type="text"
                label="Ваш номер телефона"
                placeholder="+7 (XXX) XXX XX-XX"
                labelPlacement="inside"
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl text-base sm:text-lg"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                name="phoneNumber"
              />
              <Textarea
                id="shopList"
                label="Список товаров:"
                labelPlacement="inside"
                placeholder="Ваше сообщение..."
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
                name="shopList"
                readOnly
                value={shopList}
                onChange={(event) => setShopList(event.target.value)}
              />
              <Textarea
                isRequired
                id="comment"
                label="Сообщение"
                labelPlacement="inside"
                placeholder="Ваше сообщение..."
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
              <Button color="primary" type="submit">
                Отправить заказ на сумму {FormatPrice(totalAmount)} ₽
              </Button>
              <Button
                onClick={clearCart}
                variant="light"
                className="mt-2"
                color="danger"
              >
                Очистить корзину
              </Button>
            </form>
            <small className="mt-4 text-center">
              <p className="text-sky-300">
                Нажимая на кнопку, вы даете согласие на обработку персональных
                данных и соглашаетесь с{" "}
                <a href="/personal" className="text-sky-300 underline">
                  политикой конфиденциальности
                </a>
              </p>
            </small>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="light" className="mb-8">
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
