import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  handleAddClick,
  clothingItems,
  handleSignout,
  openModal,
  handleCardLike,
}) {
  const handleEditProfile = () => {
    openModal("edit");
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleUpdateClick={handleEditProfile}
          handleLogout={handleSignout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
