import { Header } from "./components/Header"
import { SummaryTable } from "./components/SummaryTable"
import "./styles/global.css"
// import "./lib/dayjs"
import { api } from "./lib/axios"

navigator.serviceWorker.register('service-worker.js')
  .then(async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      const publicKeyResponse = await api.get('push/public_key')

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey
      })
    }

    // SUBSCRIPTION
    // {
    //   "endpoint": "https://fcm.googleapis.com/fcm/send/d6GknMtjc7E:APA91bGs-TrgBq1xG1mNRQmm_8kqox04ky6o9RC5SLeomgCujGeVsPxaihbxpeAE-_Uz5EN2y7hyeUC4BDhZbZMP7Prf_xr5lVWPw7sa0G37U8aAOXIPMfYSb5rk-al8YpVEU9gjjpQn",
    //   "expirationTime": null,
    //   "keys": {
    //       "p256dh": "BIbpzIb4j7t6Cw-AGBOXd2CIbWbgdPxPHIfh5TPtfnx0Zzy9IFu_mNzkivDe_vwBM1marhwfQAw-ZENJTiBasIQ",
    //       "auth": "BoKUGcWoRnsc5H8KnUhzaQ"
    //   }
    // }

    await api.post('/push/register', {
      subscription
    })

    await api.post('/push/send', {
      subscription
    })

  })

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
