import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export const InspectorInput = ({
    label,
    value,
    onChange,
    min = 0,
    max = 10,
    step = 0.1,
  }) => {
    return (
      <div className="mb-4">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center mt-1">
          <Input
            type="number"
            value={value.toFixed(2)}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-20 mr-2"
            step={step}
          />
          <Slider
            value={[value]}
            min={min}
            max={max}
            step={step}
            onValueChange={([newValue]) => onChange(newValue)}
            className="flex-1"
          />
        </div>
      </div>
    );
  };