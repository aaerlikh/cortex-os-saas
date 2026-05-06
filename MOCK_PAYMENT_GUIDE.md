# 🧪 Mock Payment Mode — Testing Guide

## Что это?

**Mock Mode** позволяет тестировать весь контур платежей БЕЗ реальных денег.

- ✅ Платежи НЕ снимаются со счета
- ✅ Полностью работает весь UI/UX flow
- ✅ Идеально для разработки и тестирования

---

## 🚀 Как включить Mock Mode?

### **Шаг 1: Создайте `.env.local`**

```bash
cp .env.local.example .env.local
```

### **Шаг 2: Установите переменную**

```env
NEXT_PUBLIC_PAYMENT_MODE=mock
```

### **Шаг 3: Перезагрузите dev-сервер**

```bash
npm run dev
```

---

## 📝 Тестовый флоу в Mock Mode

### **Шаг за шагом:**

```
1. Зайдите на /pricing
   ↓
2. Выберите план (Pro или Enterprise)
   ↓
3. Нажмите "Choose Plan"
   ↓
4. Будете переведены на /checkout
   ↓
5. Заполните форму
   ↓
6. Нажмите "Complete Payment ₽2,900"
   ↓
7. ✅ МОМЕНТАЛЬНО перенесетесь на /checkout/success
   ↓
8. Увидите "Payment Successful"
   ↓
9. Статус: "Active" ✅
```

### **Что произойдет в фоне:**

```javascript
// Mock mode автоматически генерирует:
- Payment ID: test_1714123456_a1b2c3d4e
- Amount: ₽2,900 RUB
- Status: succeeded (оплачено)
- Timestamp: сейчас
- Metadata: plan_id, user_email, billing_period
```

---

## 🔄 Переключение между режимами

### **Для производства (Production):**

```env
NEXT_PUBLIC_PAYMENT_MODE=production
YOOKASSA_SHOP_ID=your_actual_shop_id
YOOKASSA_SECRET_KEY=your_actual_secret_key
```

### **Для разработки (Development):**

```env
NEXT_PUBLIC_PAYMENT_MODE=mock
```

---

## ✅ Проверка работы

### **Mock Mode включен, если:**

- ✅ Нет реальных платежей в YooKassa
- ✅ Payment ID начинается с `test_`
- ✅ Платеж мгновенно переходит в `succeeded`
- ✅ Success page открывается сразу

### **Production Mode включен, если:**

- ✅ Платежи идут через реальный YooKassa API
- ✅ Payment ID формат от YooKassa (обычно UUID)
- ✅ Нужна перенаправление на платежные системы
- ✅ Платежи появляются в YooKassa dashboard

---

## 🐛 Отладка

### **Как проверить текущий режим?**

Откройте **DevTools** (F12) → **Console**:

```javascript
// Проверьте значение переменной
console.log(process.env.NEXT_PUBLIC_PAYMENT_MODE); // 'mock' или 'production'
```

### **Как просмотреть mock-платеж в консоли?**

API route `/api/checkout` вернет:

```json
{
  "paymentId": "test_1714123456_a1b2c3d4e",
  "confirmationUrl": "http://localhost:3000/checkout/success?paymentId=test_1714123456_a1b2c3d4e",
  "status": "succeeded"
}
```

---

## 📋 Когда переходить на Production?

Переходите на `production` режим когда:

1. ✅ YooKassa SHOP_ID и SECRET_KEY получены
2. ✅ Frontend протестирован в mock-режиме
3. ✅ Backend готов обрабатывать платежи
4. ✅ Database schema создана
5. ✅ Deploy готов к production

---

## ⚠️ Важно!

- Mock Mode **видит** переменную `NEXT_PUBLIC_PAYMENT_MODE`
- Все значения `test_*` автоматически рассматриваются как mock
- Production режим требует РЕАЛЬНЫЕ YooKassa credentials
- Если YooKassa credentials отсутствуют — будет ошибка в production режиме

---

**Готовы к тестированию?** 🚀

```bash
npm run dev
```

Откройте: **http://localhost:3000/pricing**
