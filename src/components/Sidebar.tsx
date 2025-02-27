import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router"

function Sidebar({ isOpen,CreatedRooms,JoinedRooms }: { isOpen: boolean,CreatedRooms:any,JoinedRooms:any }) {
  const location = useLocation() // Get current path
  const sidebarRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#0a0a0a] text-white p-5 overflow-y-auto scrollbar-hide shadow-lg">
        <ul className="space-y-3">
          {/* {SidebarData.map((category) => (
            <li key={category.path}>
              <div className="text-lg font-bold">{category.name}</div>
              <ul className="mt-2 space-y-2">
                {category.subcategories?.map((sub) => (
                  <motion.li
                    key={sub.path}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    <Link
                      to={`/${sub.path}`} // Changed href to to
                      className={`block px-2 rounded-md transition-all ${
                        location.pathname === `/${sub.path}` ? "text-glow" : ""
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </li>
          ))} */}
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-full bg-[#0a0a0a] text-white p-5 overflow-y-auto scrollbar-hide shadow-lg md:hidden z-50"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <ul className="space-y-3">
              {/* {SidebarData.map((category) => (
                <li key={category.path}>
                  <div className="text-lg font-bold">{category.name}</div>
                  <ul className="mt-2 space-y-2">
                    {category.subcategories?.map((sub) => (
                      <motion.li
                        key={sub.path}
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                        }}
                      >
                        <Link
                          to={`/${sub.path}`} // Changed href to to
                          className={`block px-2 rounded-md transition-all ${
                            location.pathname === `/${sub.path}`
                              ? "text-white"
                              : "text-[#838383] hover:text-white"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </li>
              ))} */}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
