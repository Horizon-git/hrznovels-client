'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { getSearchWith } from '../../helpers/searchWith';
import './DropDown.scss';
import classNames from 'classnames';
import { SortOption } from '@/types/SortOption';

type Props = {
  currentOption: string;
  searchName: string;
  options: SortOption[];
};

function getLabel(options: SortOption[], value: string): string | undefined {
  const option = options.find(selection => selection.value === value);

  return option ? option.label : undefined;
}

export const DropDown: React.FC<Props> = ({
  options,
  currentOption,
  searchName,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;

      if (!rootRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div
      ref={rootRef}
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className={classNames('button button--dropdown dropdown', {
            'button--dropdown-focus': expanded,
          })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span className="dropdown__current">
            {getLabel(options, currentOption) || 'Choose an option'}
          </span>

          <span className="icon icon--arrow--gray--down" />
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <ul
          className={classNames('dropdown__list', {
            'dropdown__list--visible': expanded,
          })}
        >
          {options.map(({ label, value }) => {
            const search = getSearchWith(
              new URLSearchParams(searchParams.toString()),
              { [searchName]: value },
            );

            return (
              <li key={value}>
                <Link
                  href={`${pathname}?${search}`}
                  className="dropdown__link"
                  onClick={() => setExpanded(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
