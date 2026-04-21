import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Upload, CheckCircle2, ShieldCheck, MapPin, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/design-system/Button";
import { Input } from "../components/design-system/Input";
import { getItemById, ItemData } from "../../services/itemService";
import { toast } from "sonner";

export const ClaimFlowScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [item, setItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getItemById(id);
        setItem(data);
      } catch (error) {
        toast.error("Failed to load item");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-foreground">Item Not Found</h2>
      </div>
    );
  }

  const steps = [
    { num: 1, title: "Verify Identity" },
    { num: 2, title: "Provide Proof" },
    { num: 3, title: "Connect" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : navigate(`/item/${id}`)}
          className="p-2 rounded-md bg-secondary/50 border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Claim Item</h1>
          <p className="text-sm text-muted-foreground">Follow the steps to claim this {item.category}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Progress Tracker */}
        <div className="bg-secondary/30 px-8 py-6 border-b border-border">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-border -z-10" />
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-2 bg-card relative z-10 px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step >= s.num
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary border-2 border-border text-muted-foreground"
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-xs font-medium ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-2">Campus Verification</h2>
                <p className="text-sm text-muted-foreground">
                  To prevent fraud, you must verify your identity using your university credentials before claiming an item.
                </p>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-status-found/20 rounded-full flex items-center justify-center text-status-found">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Verified Student</p>
                    <p className="text-xs text-muted-foreground">Your account is already verified.</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Describe the Item</h2>
                <p className="text-sm text-muted-foreground">
                  Provide specific details that only the true owner would know (e.g., scratches, wallpaper, serial number).
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Identifying Details</label>
                <textarea
                  className="w-full h-32 p-3 bg-input-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                  placeholder="It has a small scratch on the bottom left corner..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Upload Proof (Optional)</label>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-border border-dashed rounded-md cursor-pointer bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-medium">Upload receipt or photo</span>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => setStep(3)}
                disabled={description.length < 10}
              >
                Submit Proof
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center py-4">
              <div className="w-20 h-20 bg-status-found/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-status-found" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Claim Submitted!</h2>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Your claim has been sent to the finder. They will review your proof and contact you shortly.
                </p>
              </div>

              <div className="bg-secondary/30 border border-border rounded-lg p-4 text-left">
                <h4 className="text-sm font-semibold text-foreground mb-3">Next Steps</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                    Wait for the finder to approve your claim.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                    Once approved, a secure chat will open.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                    Arrange a safe public meeting place to retrieve your item.
                  </li>
                </ul>
              </div>

              <Button size="lg" className="w-full" onClick={() => navigate("/chat/1")}>
                Go to Messages
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};