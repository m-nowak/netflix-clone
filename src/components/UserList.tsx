import { useUsers } from "@/hooks/requests";
import useUserStore from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  image: string;
};

export default function UserList() {
  const { isLoading, data, isFetching }: any = useUsers();
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleSignIn = (user: any) => {
    setUser(user);
    router.push("/");
  };
  return (
    <>
      {isLoading || isFetching ? (
        <div className="text-white">Loading ...</div>
      ) : (
        <>
          <div className="flex flex-col space-y-4 w-full">
            {data.map((user: Props) => (
              <div
                key={user.name}
                onClick={() => handleSignIn(user)}
                className="p-3  group/item flex flex-row items-center space-x-3 cursor-pointer w-full rounded-md hover:bg-gray-900"
              >
                <img
                  className="w-8 h-8 rounded-md"
                  src={`/images/${user.image}.png`}
                  alt=""
                />
                <p className="text-white text-sm group-hover/item:underline">
                  {user.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
