import phoneimg from "../../assets/landing.png"
import DOWNLOAD from "../../assets/appDownload.png"
const Homepage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
            tuck into a takeaway today
        </h1>
        <span className="text-xl">food is just a click away!!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={phoneimg} className="cursor-pointer"/>
        <div className="flex flex-col items-center justify-center text-center gap-4">
            <span className="tracking-tighter font-bold text-3xl">order takeaway even faster!</span>
            <span className="font-semibold">download the eazyeats aap now for faster ordering and personalised recommendations</span>
            <img src={DOWNLOAD} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Homepage
