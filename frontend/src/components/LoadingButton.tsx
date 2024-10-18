import { Loader2 } from "lucide-react"

const LoadingButton = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
     
        < Loader2 className="h-10 w-10 animate-spin" color="orange"/>

    </div>
  )
}

export default LoadingButton
