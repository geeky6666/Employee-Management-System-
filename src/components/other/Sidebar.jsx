import React from "react";
import { LogOut } from "lucide-react";
import { brand } from "../../brand";

// The navigation shared by the admin and employee dashboards.
//  - On a computer it is a column on the left.
//  - On a phone it becomes a top bar: brand + logout on the first row,
//    and the tabs on a second row.
// It knows nothing about tasks or salary -- it only shows nav items and
// reports which one was clicked.
//
// navItems  -> [{ key: "board", label: "Board", icon: SomeIcon, badge: 2 }, ...]  (badge is optional)
// activeKey -> which item is currently selected
// onSelect  -> called with the key of the item the user clicked
// userName / userRole -> shown at the bottom on a computer
const Sidebar = ({ navItems, activeKey, onSelect, userName, userRole, onLogout }) => {
  return (
    <aside className="w-full sm:w-60 shrink-0 bg-surface border-b sm:border-b-0 sm:border-r border-border flex flex-col sm:h-screen sm:sticky sm:top-0">
      {/* Brand (+ logout icon on phones) */}
      <div className="flex items-center justify-between gap-2.5 px-5 py-4 sm:py-5 sm:border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-accent text-white font-extrabold text-base flex items-center justify-center">
            N
          </div>
          <span className="font-extrabold text-lg tracking-tight">{brand.name}</span>
        </div>

        <button
          onClick={onLogout}
          className="sm:hidden flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-status-failed"
          aria-label="Log out"
        >
          <LogOut size={17} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex sm:flex-col gap-1 px-3 pb-3 sm:py-4 sm:flex-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = item.key === activeKey;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                isActive ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-2 hover:text-ink"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {item.label}
              {/* optional little number, e.g. submissions waiting for review */}
              {item.badge > 0 && (
                <span className="sm:ml-auto bg-status-submitted text-white text-[11px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User + logout (computer only) */}
      <div className="hidden sm:block px-3 py-4 border-t border-border">
        <div className="px-3 mb-3">
          <p className="text-sm font-bold truncate">{userName}</p>
          <p className="text-xs text-muted truncate">{userRole}</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-muted hover:bg-status-failed/10 hover:text-status-failed transition-colors"
        >
          <LogOut size={16} strokeWidth={2} />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
