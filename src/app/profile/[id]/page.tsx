export default function UserProfilePage({params}:any) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>This is a user profile page 
        <span className="text-orange-400 text-3xl">
            {params.id}
        </span>
        </p>
    </div>
  );
}