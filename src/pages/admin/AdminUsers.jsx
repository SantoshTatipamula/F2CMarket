import { useMemo, useState } from "react";
import { Search, UserCheck, UserX, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import PageHeader from "@/components/common/ui/PageHeader";
import EmptyState from "@/components/common/ui/EmptyState";
import ErrorState from "@/components/common/ui/ErrorState";

export default function AdminUsers() {
  const { users, updateUserInList, usersLoading, usersError, refreshUsers } = useAuth();
  const [search, setSearch] = useState("");

  const consumers = useMemo(() =>
    users.filter((u) => u.role === "consumer" &&
      (u.name?.toLowerCase().includes(search.toLowerCase()) ||
       u.email?.toLowerCase().includes(search.toLowerCase()))),
    [users, search]
  );

  const toggleBan = (user) =>
    updateUserInList({ ...user, banned: !user.banned });

  return (
    <section className="min-h-screen bg-[var(--surface)] py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Breadcrumb items={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Users" }]} />
        <PageHeader title="Manage Users" subtitle={`${consumers.length} registered consumers`} />

        <div className="flex items-center gap-2 h-11 px-4 rounded-xl border border-[var(--border)] bg-white mb-6 max-w-sm">
          <Search size={16} className="text-[var(--text-muted)] shrink-0" />
          <input type="text" placeholder="Search by name or email…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-muted)]" />
        </div>

        {usersError ? (
          <ErrorState
            title="Couldn't load users"
            description="We ran into a problem loading the users list. Please try again."
            onRetry={refreshUsers}
          />
        ) : usersLoading ? (
          <div className="bg-white border border-[var(--border)] rounded-2xl p-8 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-[var(--surface-2)] animate-pulse" />
            ))}
          </div>
        ) : consumers.length === 0 ? (
          <EmptyState icon={Users} title="No Consumers Found" description="No consumers have registered yet." />
        ) : (
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                    {["Name","Email","Joined","Status","Action"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 font-semibold text-[var(--text-secondary)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {consumers.map((user) => (
                    <tr key={user.id} className="hover:bg-[var(--surface)] transition">
                      <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{user.name}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{user.email}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          user.banned ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>{user.banned ? "Banned" : "Active"}</span>
                      </td>
                      <td className="px-5 py-3">
                        <button onClick={() => toggleBan(user)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            user.banned
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}>
                          {user.banned
                            ? <><UserCheck size={13} /> Activate</>
                            : <><UserX size={13} /> Ban</>}
                        </button>
                      </td>
                    </tr>
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
