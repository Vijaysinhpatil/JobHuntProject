
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "@radix-ui/react-label"

const FilterJobCards = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi", "Pune", "Nipani", "Kolhapur", "Sangli"],
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
      filterType: "Salary",
      array: ["10-40k", "42-1lakh", "1lakh-5lakh"],
    },
  ]


  return (
    <div className="w-full bg-white p-4 rounded-full"
     style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h1 className="text-lg font-semibold">Filter Jobs</h1>
      <hr className="font-bold mt-3 mb-4" />

      {filterData.map((item, idx) => (
        <div key={idx} className="mb-4">
          <h2 className="font-medium text-gray-700 mb-2">{item.filterType}</h2>

          <RadioGroup className="space-y-2">
            {item.array.map((option, i) => {
              const id = `${item.filterType}-${i}`
              return (
                <div key={id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={id} />
                  <Label htmlFor={id} className="cursor-pointer">
                    {option}
                    {/* {id} */}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterJobCards
