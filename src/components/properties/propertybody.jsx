import PropertyOverview from "./propertyoverview";
import PropertyDescription from "./propertydescription";
import PropertyFeatures from "./propertyfeatures";
import PropertyAddress from "./propertyaddress";

export default function PropertyBody({ listing }) {
  return (
    <div className="space-y-6">
      <PropertyOverview listing={listing} />
      <PropertyDescription listing={listing} />
      <PropertyFeatures listing={listing} />
      <PropertyAddress listing={listing} />
    </div>
  );
}