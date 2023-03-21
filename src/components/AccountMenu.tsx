import { Menu } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useUserStore from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";

export default function AccountMenu() {
  const { user, unsetUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = () => {
    unsetUser({});
    router.push("/auth");
  };
  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            {" "}
            <Menu.Button
              aria-label="mobile menu"
              className="flex flex-row items-center gap-2 cursor-pointer relative"
            >
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img
                  src={`/images/${user?.image ? user.image : "red"}.png`}
                  alt="profile-img"
                />
              </div>
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
                className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex"
              >
                <div className="flex flex-col gap-3">
                  <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img
                      className="w-8 rounded-md"
                      src={`/images/${user?.image}.png`}
                      alt="profile-image"
                    />
                    <p className="text-white text-sm group-hover/item:underline">
                      {user?.name}
                    </p>
                  </div>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <Menu.Item
                  onClick={handleSignOut}
                  as="div"
                  className="cursor-pointer px-3 text-center text-white text-sm hover:underline"
                >
                  Sign out of Netflix
                </Menu.Item>
              </Menu.Items>
            ) : null}
          </>
        )}
      </Menu>
    </div>
  );
}
