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
  Textarea
} from "@nextui-org/react";

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart, setCart } = useContext(CartContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); // Состояние для общей суммы заказа

  useEffect(() => {
    updateMessage();
  }, [cart]);

  const updateMessage = () => {
    // Формируем текст сообщения на основе содержимого корзины
    const itemsText = cart.map((item) => `${item.product.title} (${item.quantity} шт.)`).join('\n');
    const calculatedTotalAmount = cart.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
    setTotalAmount(calculatedTotalAmount); // Обновляем состояние totalAmount
    setMessage(`\n${itemsText}\n\nОбщая сумма заказа: ${FormatPrice(calculatedTotalAmount)} ₽`);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = value.replace(/\D/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');
    setPhoneNumber(formattedValue);
  };

  const sendContactForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = { email, phoneNumber, message };

    try {
      const response = await fetch('/api/sendemail/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при отправке сообщения.');
    }
  };

  const clearCart = () => {
    setCart([]); // Очищаем корзину
    setTotalAmount(0); // Сбрасываем общую сумму заказа
    setMessage(''); // Очищаем сообщение
    onClose(); // Закрываем модальное окно
  };
  
  return (
    <>
      <Button onClick={onOpen} color="primary" variant="flat">
        <Icon name="cart" size={24} className="fill-primary" />
        <span>
          {FormatPrice(
            cart.reduce(
              (accumulator, currentProduct) =>
                accumulator +
                currentProduct.product.price * currentProduct.quantity,
              0
            )
          )}
          ₽
        </span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="text-2xl">Оформить заказ!</ModalHeader>
          <ModalBody>
            <form
              onSubmit={sendContactForm}
              id="contact-form"
              method="post"
              role="form"
              className="w-full max-w-sm flex flex-col gap-2 mx-auto"
            >
              <Input
                isRequired
                id="email"
                type="email"
                label="Ваш Email"
                labelPlacement="inside"
                className="max-w-sm"
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
                className="max-w-sm"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                name="phoneNumber"
              />
              <Textarea
                isRequired
                id="message"
                label="Сообщение"
                labelPlacement="inside"
                placeholder="Ваше сообщение..."
                className="max-w-sm"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <Button color="primary" type="submit">
                Отправить заказ на сумму {FormatPrice(totalAmount)} ₽
              </Button>
              <Button onClick={clearCart} variant="light" className="mt-2" color="danger">
                Очистить корзину
              </Button>
            </form>
            <small>
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
            <Button onClick={onClose} variant="light">
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
