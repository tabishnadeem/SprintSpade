import UserMenu from "./UserMenu";

export default function Avatar(props: any) {
  const user = window.sessionStorage.getItem("user") || "";
  return (
    <>
      {/* Current Signed In User Avatar */}
      <div
        tabIndex={0}
        className="avatar placeholder cursor-pointer dropdown dropdown-bottom dropdown-end"
      >
        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
          <span>{user[0]}</span>
        </div>

        <UserMenu user={user} />
      </div>

      {/* Divider */}
      <div className="divider divider-horizontal"></div>

      {/* All Users joined in current room */}
      <div className="avatar-group -space-x-5">
        {props.users
          .filter((user_: string) => user_ != "showData")
          .filter((user_: string) => user_ != user)
          .map((user_: string, index: number) => (
            <div className="avatar placeholder">
              <div
                key={index}
                className="bg-neutral-focus text-neutral-content rounded-full w-8"
              >
                <span>{user_[0]}</span>
              </div>
            </div>
          ))}
        {props.users.length > 10 && (
          <div className="avatar placeholder">
            <div className="w-8 bg-neutral-focus text-neutral-content">
              <span>+99</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
