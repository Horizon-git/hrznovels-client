import React from 'react'
import styles from './Chips.module.scss';
import { Chip } from "@mui/material";

type Props = {
  names: string[];
}

export default function Chips({ names }: Props) {
  return (
    <div className={styles.chips}>
      {names.map(chip => (
        <Chip
          className={styles.chip}
          key={chip}
          label={chip}
        />
      ))}
  </div>
  )
}
