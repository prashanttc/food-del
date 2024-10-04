import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

const LoadingButton = () => {
  return (
    <div>
      <Button disabled> 
        < Loader2 className="h-4 mr-2 w-4 animate-spin" />
      </Button>
    </div>
  )
}

export default LoadingButton
