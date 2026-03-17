import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { path: '/',          label: 'Dashboard'  },
  { path: '/calendar',  label: 'Calendar'   },
  { path: '/insights',  label: 'Insights'   },
  { path: '/settings',  label: 'Settings'   },
];

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col p-4">
        <h1 className="text-lg font-semibold mb-8 px-2">CampusFlow</h1>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ path, label }) => (
            <NavLink key={path} to={path} end={path === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors
                 ${isActive
                   ? 'bg-violet-50 text-violet-700'
                   : 'text-gray-600 hover:bg-gray-50'}`
              }
            >{label}</NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content — Outlet renders the current page */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}