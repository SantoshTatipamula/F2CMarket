import { useMemo, useState } from "react";
import { Search, CheckCircle2, XCircle, ChevronDown, ChevronUp, Sprout } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sendGenericEmail } from "@/services/emailService";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import PageHeader from "@/components/common/ui/PageHeader";
import EmptyState from "@/components/common/ui/EmptyState";

const STATUS_TABS = ["All", "pending", "approved", "rejected"];

function StatusPill({ status }) {
  const map = {
    pending:  "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function FarmerRow({ farmer, onApprove, onReject }) {
  const [expanded, setExpanded] = useState(false);
  const isPending  = farmer.verificationStatus === "pending";
  const isApproved = farmer.verificationStatus === "approved";

  return (
    <>
      <tr className="hover:bg-[var(--surface)] transition cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{farmer.name}</td>
        <td className="px-5 py-3 text-[var(--text-secondary)] max-w-[160px] truncate">{farmer.email}</td>
        <td className="px-5 py-3 text-[var(--text-secondary)]">{farmer.farmName || "—"}</td>
        <td className="px-5 py-3 text-[var(--text-secondary)]">{farmer.farmLocation || "—"}</td>
        <td className="px-5 py-3"><StatusPill status={farmer.verificationStatus || "pending"} /></td>
        <td className="px-5 py-3">
          <div className="flex items-center gap-2">
            {isPending && (
              <>
                <button onClick={(e) => { e.stopPropagation(); onApprove(farmer); }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold transition">
                  <CheckCircle2 size={12} /> Approve
                </button>
                <button onClick={(e) => { e.stopPropagation(); onReject(farmer); }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition">
                  <XCircle size={12} /> Reject
                </button>
              </>
            )}
            {isApproved && (
              <button onClick={(e) => { e.stopPropagation(); onReject(farmer); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition">
                <XCircle size={12} /> Revoke
              </button>
            )}
            {!isPending && !isApproved && (
              <button onClick={(e) => { e.stopPropagation(); onApprove(farmer); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold transition">
                <CheckCircle2 size={12} /> Approve
              </button>
            )}
            {expanded ? <ChevronUp size={14} className="text-[var(--text-muted)]" /> : <ChevronDown size={14} className="text-[var(--text-muted)]" />}
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-[var(--surface)]">
          <td colSpan={6} className="px-5 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[var(--text-secondary)]">
              {[
                ["Phone",        farmer.phone],
                ["Specialty",    farmer.specialty],
                ["Experience",   farmer.experience],
                ["Gov ID",       farmer.govId],
                ["Farm Reg No.", farmer.farmRegNo],
                ["Registered",   farmer.createdAt ? new Date(farmer.createdAt).toLocaleDateString("en-IN") : "—"],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="font-semibold text-[var(--text-primary)] mb-1">{label}</p>
                  <p>{val || "—"}</p>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminFarmers() {
  const { users, updateUserInList } = useAuth();
  const [search,    setSearch]    = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const allFarmers = users.filter((u) => u.role === "farmer");
  const pending    = allFarmers.filter((f) => f.verificationStatus === "pending").length;

  const farmers = useMemo(() =>
    allFarmers.filter((u) =>
      (u.name?.toLowerCase().includes(search.toLowerCase()) ||
       u.email?.toLowerCase().includes(search.toLowerCase())) &&
      (activeTab === "All" || u.verificationStatus === activeTab)),
    [users, search, activeTab]
  );

  const approveFarmer = (farmer) => {
    updateUserInList({ ...farmer, verificationStatus: "approved", verified: true });
    sendGenericEmail({
      name:    farmer.name,
      email:   farmer.email,
      subject: "Your Farmer Account is Approved — F2CMARKET",
      message: `Hi ${farmer.name},\n\nCongratulations! Your farmer account on F2CMARKET has been verified and approved.\n\nYou can now login and start listing your products at: ${window.location.origin}/login\n\nWelcome to the F2CMARKET family! 🌱\n\nF2CMARKET Team`,
    });
  };

  const rejectFarmer = (farmer) => {
    updateUserInList({ ...farmer, verificationStatus: "rejected", verified: false });
    sendGenericEmail({
      name:    farmer.name,
      email:   farmer.email,
      subject: "Farmer Account Update — F2CMARKET",
      message: `Hi ${farmer.name},\n\nWe have reviewed your farmer application for F2CMARKET.\n\nUnfortunately, we were unable to verify your account at this time. Please ensure your documents are valid and contact support at support@f2cmarket.com for assistance.\n\nF2CMARKET Team`,
    });
  };

  return (
    <section className="min-h-screen bg-[var(--surface)] py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Breadcrumb items={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Farmers" }]} />
        <PageHeader
          title="Manage Farmers"
          subtitle={`${allFarmers.length} farmers · ${pending} pending verification`}
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {STATUS_TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition capitalize ${
                  activeTab === tab
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-green-400"
                }`}>
                {tab === "pending" ? `Pending (${pending})` : tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 h-10 px-3 rounded-xl border border-[var(--border)] bg-white sm:ml-auto max-w-xs w-full">
            <Search size={15} className="text-[var(--text-muted)] shrink-0" />
            <input type="text" placeholder="Search farmers…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-muted)]" />
          </div>
        </div>

        {farmers.length === 0 ? (
          <EmptyState icon={Sprout} title="No Farmers Found" description="No farmers match the current filter." />
        ) : (
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                    {["Name","Email","Farm Name","Location","Status","Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 font-semibold text-[var(--text-secondary)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {farmers.map((farmer) => (
                    <FarmerRow key={farmer.id} farmer={farmer}
                      onApprove={approveFarmer} onReject={rejectFarmer} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
