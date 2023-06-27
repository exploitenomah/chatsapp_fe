import { isSubString } from '@utils/index'

export default function SearchableContent({
  text,
  search,
}: {
  text: string
  search?: string
}) {
  return (
    <>
      <span>
        {search && search.length > 0 && isSubString(text, search) ? (
          <span
            dangerouslySetInnerHTML={{
              __html: text
                .toLocaleLowerCase()
                .split(search.toLocaleLowerCase().trim())
                .join('-')
                .replaceAll(
                  '-',
                  `<span style='color: #00a884;'>${search
                    .toLocaleLowerCase()
                    .trim()}</span>`,
                ),
            }}
          />
        ) : (
          <>{text}</>
        )}
      </span>
    </>
  )
}
