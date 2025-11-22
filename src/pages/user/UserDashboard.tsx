const UserDashboard = () => {
  return (
    <div className="bg-background text-text-primary min-h-screen p-8">
      <h1 className="text-h1 font-heading font-bold bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
        Premium Dashboard
      </h1>

      <div className="card card-hover p-8 mt-8">
        <button className="btn-primary">Primary Action</button>
        <button className="btn-outline ml-4">Outline</button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="badge bg-primary-500/10 text-primary-600">New</div>
          <p className="mt-4 text-text-secondary">Revenue</p>
          <p className="text-3xl font-bold">$48,574</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
