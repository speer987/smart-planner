export default function Svg({ d, fill }) {
  return (
    <svg
      className="absolute bottom-0 w-full z-10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path fill={fill} fillOpacity="1" d={d}></path>
    </svg>
  );
}
