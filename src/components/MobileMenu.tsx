import { Menu } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function MobileMenu() {
  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              aria-label="mobile menu"
              className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
            >
              <p className="text-white text-sm">Browse</p>
              <ChevronDownIcon
                className={`w-4 text-white fill-white transition ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </Menu.Button>

            {open ? (
              <Menu.Items
                as={m.div}
                static
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex"
              >
                <div className="flex flex-col gap-4">
                  <Menu.Item
                    as="div"
                    className="px-3 text-center text-white hover:underline"
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item
                    as="div"
                    className="px-3 text-center text-white hover:underline"
                  >
                    Series
                  </Menu.Item>
                  <Menu.Item
                    as="div"
                    className="px-3 text-center text-white hover:underline"
                  >
                    Films
                  </Menu.Item>
                  <Menu.Item
                    as="div"
                    className="px-3 text-center text-white hover:underline"
                  >
                    New & Popular
                  </Menu.Item>
                  <Menu.Item
                    as="div"
                    className="px-3 text-center text-white hover:underline"
                  >
                    My List
                  </Menu.Item>
                  <Menu.Item
                    as="div"
                    className="px-3 text-center text-white hover:underline"
                  >
                    Browse by Languages
                  </Menu.Item>
                </div>
              </Menu.Items>
            ) : null}
          </>
        )}
      </Menu>{" "}
    </div>
  );
}
