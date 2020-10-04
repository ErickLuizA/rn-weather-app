interface isVerticalProps {
  height: number
  width: number
}

export function isVertical({ height, width }: isVerticalProps) {
  if (height > width) {
    return true
  } else {
    return false
  }
}
